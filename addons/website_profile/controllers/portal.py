# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

from oi.addons.portal.controllers import portal
from oi.http import request


class CustomerPortal(portal.CustomerPortal):

    def on_account_update(self, values, partner):
        super().on_account_update(values, partner)
        # Do not show "Validation Email sent" if the current user changed their email address
        if values["email"] != partner.email:
            request.session['validation_email_sent'] = False
