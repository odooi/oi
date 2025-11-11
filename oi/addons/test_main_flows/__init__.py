# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.
from .models import model_multicompany

#
# Conditional installation of plus modules.
#
# This module is defined in community but some steps (defined with 'edition: "plus"')
# are only used to test plus. As it's not possible to direcly add plus
# modules dependencies, this post install hook will install accounting if exists.
#
def _auto_install_plus_dependencies(env):
    module_list = ['accountant']
    module_ids = env['ir.module.module'].search([('name', 'in', module_list), ('state', '=', 'uninstalled')])
    module_ids.sudo().button_install()
