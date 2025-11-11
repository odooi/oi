# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

from oi import fields, models


class UtmCampaign(models.Model):
    _inherit = 'utm.campaign'

    ab_testing_sms_winner_selection = fields.Selection(selection_add=[('crm_lead_count', 'Leads')])
