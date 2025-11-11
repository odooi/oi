#!/usr/bin/env bash

sudo service led-status stop

cd /home/pi/oi
localbranch=$(git symbolic-ref -q --short HEAD)
localremote=$(git config branch.$localbranch.remote)

if [[ "$(git remote get-url "$localremote")" != *oi/oi* ]]; then
    git remote set-url "${localremote}" "https://github.com/oi/oi.git"
fi

echo "addons/point_of_sale/tools/posbox/overwrite_after_init/home/pi/oi" >> .git/info/sparse-checkout

git fetch "${localremote}" "${localbranch}" --depth=1
git reset "${localremote}"/"${localbranch}" --hard

sudo git clean -dfx
if [ -d /home/pi/oi/addons/point_of_sale/tools/posbox/overwrite_after_init ]; then
    cp -a /home/pi/oi/addons/point_of_sale/tools/posbox/overwrite_after_init/home/pi/oi/* /home/pi/oi/
    rm -r /home/pi/oi/addons/point_of_sale/tools/posbox/overwrite_after_init
fi

# TODO: Remove this code when v16 is deprecated
oi_conf="addons/point_of_sale/tools/posbox/configuration/oi.conf"
if ! grep -q "server_wide_modules" $oi_conf; then
    echo "server_wide_modules=hw_drivers,hw_escpos,hw_posbox_homepage,point_of_sale,web" >> $oi_conf
fi

sudo service led-status start
