# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

from oi import fields, models


class SriPayment(models.Model):

    _name = "l10n_ec.sri.payment"
    _description = "SRI Payment Method"

    name = fields.Char("Name", translate=True)
    code = fields.Char("Code")
    active = fields.Boolean("Active", default=True)
