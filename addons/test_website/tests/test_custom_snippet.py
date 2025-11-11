# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

import oi.tests
from oi.tools import mute_logger


@oi.tests.common.tagged('post_install', '-at_install')
class TestCustomSnippet(oi.tests.HttpCase):

    @mute_logger('oi.addons.http_routing.models.ir_http', 'oi.http')
    def test_01_run_tour(self):
        self.start_tour(self.env['website'].get_client_action_url('/'), 'test_custom_snippet', login="admin")
