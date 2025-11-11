%global name oi
%global release 1
%global unmangled_version %{version}
%global __requires_exclude ^.*oi/addons/mail/static/scripts/oi-mailgate.py$

Summary: Oi Server
Name: %{name}
Version: %{version}
Release: %{release}
Source0: %{name}-%{unmangled_version}.tar.gz
License: LGPL-3
Group: Development/Libraries
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-buildroot
Prefix: %{_prefix}
BuildArch: noarch
Vendor: Oi S.A. <info@odoodooi.com>
Requires: sassc
BuildRequires: python3-devel
BuildRequires: pyproject-rpm-macros
Url: https://www.odoodooi.com

%description
Oi is a complete ERP and CRM. The main features are accounting (analytic
and financial), stock management, sales and purchases management, tasks
automation, marketing campaigns, help desk, POS, etc. Technical features include
a distributed server, an object database, a dynamic GUI,
customizable reports, and XML-RPC interfaces.

%generate_buildrequires
%pyproject_buildrequires

%prep
%autosetup

%build
%py3_build

%install
%py3_install

%post
#!/bin/sh

set -e

OI_CONFIGURATION_DIR=/etc/oi
OI_CONFIGURATION_FILE=$OI_CONFIGURATION_DIR/oi.conf
OI_DATA_DIR=/var/lib/oi
OI_GROUP="oi"
OI_LOG_DIR=/var/log/oi
OI_LOG_FILE=$OI_LOG_DIR/oi-server.log
OI_USER="oi"

if ! getent passwd | grep -q "^oi:"; then
    groupadd $OI_GROUP
    adduser --system --no-create-home $OI_USER -g $OI_GROUP
fi
# Register "$OI_USER" as a postgres user with "Create DB" role attribute
su - postgres -c "createuser -d -R -S $OI_USER" 2> /dev/null || true
# Configuration file
mkdir -p $OI_CONFIGURATION_DIR
# can't copy debian config-file as addons_path is not the same
if [ ! -f $OI_CONFIGURATION_FILE ]
then
    echo "[options]
; This is the password that allows database operations:
; admin_passwd = admin
db_host = False
db_port = False
db_user = $OI_USER
db_password = False
addons_path = %{python3_sitelib}/oi/addons
default_productivity_apps = True
" > $OI_CONFIGURATION_FILE
    chown $OI_USER:$OI_GROUP $OI_CONFIGURATION_FILE
    chmod 0640 $OI_CONFIGURATION_FILE
fi
# Log
mkdir -p $OI_LOG_DIR
chown $OI_USER:$OI_GROUP $OI_LOG_DIR
chmod 0750 $OI_LOG_DIR
# Data dir
mkdir -p $OI_DATA_DIR
chown $OI_USER:$OI_GROUP $OI_DATA_DIR

INIT_FILE=/lib/systemd/system/oi.service
touch $INIT_FILE
chmod 0700 $INIT_FILE
cat << EOF > $INIT_FILE
[Unit]
Description=Oi Open Source ERP and CRM
After=network.target

[Service]
Type=simple
User=oi
Group=oi
ExecStart=/usr/bin/oi --config $OI_CONFIGURATION_FILE --logfile $OI_LOG_FILE
KillMode=mixed

[Install]
WantedBy=multi-user.target
EOF


%files
%{_bindir}/oi
%{python3_sitelib}/%{name}-*.egg-info
%{python3_sitelib}/%{name}
