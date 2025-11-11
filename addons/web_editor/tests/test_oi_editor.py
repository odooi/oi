# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

import oi.tests

@oi.tests.tagged("post_install", "-at_install")
class TestOiEditor(oi.tests.HttpCase):

    def test_oi_editor_suite(self):
        self.browser_js('/web_editor/tests', "", "", login='admin', timeout=1800)
