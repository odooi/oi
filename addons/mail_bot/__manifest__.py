# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

{
    'name': 'OiBot',
    'version': '1.2',
    'category': 'Productivity/Discuss',
    'summary': 'Add OiBot in discussions',
    'website': 'https://www.odoodooi.com/app/discuss',
    'depends': ['mail'],
    'auto_install': True,
    'installable': True,
    'data': [
        'views/res_users_views.xml',
        'data/mailbot_data.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mail_bot/static/src/scss/oibot_style.scss',
        ],
    },
    'license': 'LGPL-3',
}
