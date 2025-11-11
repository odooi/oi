# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

from oi import models


class CrmLead(models.Model):
    _inherit = 'crm.lead'
    _mailing_enabled = True
