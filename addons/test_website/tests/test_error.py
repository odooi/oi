import oi.tests
from oi.tools import mute_logger


@oi.tests.common.tagged('post_install', '-at_install')
class TestWebsiteError(oi.tests.HttpCase):

    @mute_logger('oi.addons.http_routing.models.ir_http', 'oi.http')
    def test_01_run_test(self):
        self.start_tour("/test_error_view", 'test_error_website')
