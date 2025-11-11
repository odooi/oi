# Part of Oi. See LICENSE file for full copyright and licensing details.

import oi.tests
from oi.addons.gamification.tests.common import HttpCaseGamification


@oi.tests.tagged('post_install', '-at_install')
class TestWebsiteProfile(HttpCaseGamification):
    def test_save_change_description(self):
        oi.tests.new_test_user(
            self.env, 'test_user',
            karma=100, website_published=True
        )
        self.start_tour("/", 'website_profile_description', login="admin")
