# -*- coding: utf-8 -*-
# Part of Oi. See LICENSE file for full copyright and licensing details.

from oi.tests import tagged
from oi.tests.common import TransactionCase
from oi.tools import URL_RE, OI_MODULE_RE

@tagged('post_install', '-at_install')
class TestJsTranspiler(TransactionCase):

    def test_correct_OI_MODULE_RE(self):
        cases = [
            '// @oi-module',
            '//@oi-module',
            '/* @oi-module',
            '/** @oi-module',
            '/*@oi-module',
            '/**@oi-module',
            '// @oi-module alias=web.test',
            '/* @oi-module  alias=web.test',
            '/** @oi-module  alias=web.test',
            '/** @oi-module  alias=web.test**/',
            '/* @oi-module  alias=web.test ',
            '/* @oi-module alias=web.test default=false',
            '/* @oi-module alias=web.test default=false ',
            '/* @oi-module alias=web.test default=false**/',
        ]

        for case in cases:
            assert OI_MODULE_RE.match(case), "URL_RE is failing... >%s<" % case
            if "alias" in case:
                assert OI_MODULE_RE.match(case).groupdict().get('alias'), "URL_RE is failing for alias... >%s<" % case
                assert OI_MODULE_RE.match(case).groupdict().get('alias') == "web.test", "URL_RE does not get the right alias for ... >%s<" % case
            if "default" in case:
                assert OI_MODULE_RE.match(case).groupdict().get('default'), "URL_RE is failing for default... >%s<" % case
                assert OI_MODULE_RE.match(case).groupdict().get('default') == "false", "URL_RE does not get the right default for ... >%s<" % case

    def test_incorrect_OI_MODULE_RE(self):
        cases = [
            '/* @oi-module alias = web.test ',
            '/* @oi-module alias= web.test',
            '/* @oi-module alias = web.test default=false'
        ]

        for case in cases:
            assert not OI_MODULE_RE.match(case).groupdict().get('alias'), "URL_RE should fail because of too much spaces but didn't... >%s<" % case

        cases = [
            '// @oi-modulealias=web.test',
            '/* @oi-module alias=web.testdefault=false',
        ]

        for case in cases:
            if "alias" in case and "default" in case:
                assert \
                    not OI_MODULE_RE.match(case).groupdict().get('alias') \
                    or \
                    not OI_MODULE_RE.match(case).groupdict().get('default'), "URL_RE should fail for alias and default... >%s<" % case
            elif "alias" in case:
                assert not OI_MODULE_RE.match(case).groupdict().get('alias'), "URL_RE should fail for alias... >%s<" % case

    def test_correct_URL_RE(self):
        cases = [
            'web/static/src/js/file.js',
            '/web/static/src/js/file.js',
            '/web/other/static/src/js/file.js',
            '/web/other/static/src/file.js',
            '/web/other/static/tests/file.js',
            '/web/other/static/src/another/and/file.js',
            '/web/other-o/static/src/another/and/file.js',
            '/web-o/other-o/static/src/another/and/file.js',
        ]

        for case in cases:
            assert URL_RE.fullmatch(case), "URL RE failed... %s" % case

    def test_incorrect_URL_RE(self):
        cases = [
            'web/static/js/src/file.js',                          # src after js
            'web/static/js/file.js',                              # no src or tests folder
        ]

        for case in cases:
            assert not URL_RE.fullmatch(case), "URL RE should have failed... %s" % case
