from requests import Request, Response

from django.test import TestCase
from django.core.urlresolvers import reverse


class YelpAPITestCase(TestCase):
    "tests the YelpAPI class"
    pass

class YelpSuggestionTestCase(TestCase):
    "tests the yelp_suggestion endpoint"

    def test_suggestion_endpoint_responds_with_url_of_yelp_business(self):
        # simulates expected payload from slack sending a GET request to lunchmove.info
        data = {
            "token": "D98hlGNDpozoYKeZbrKfAbCe",
            "team_id": "T0001", # that might not be right
            "team_domain": "nestio",
            "channel_id": "1934389", # maybe thats right?
            "channel_name": "lunchmove",
            "user_id": "U2147483697", # probably not right
            "user_name": "lunchbot",
            "command": "lunch_suggestion",
            "text": "this would be the search term entered after /lunch_suggestion",
        }

        url = reverse('yelp_suggestion')
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.content.startswith('http://www.yelp.com/biz'))

    def test_suggestion_endpoint_parses_for_text_of_search_term(self):
        data = {
            "token": "D98hlGNDpozoYKeZbrKfAbCe",
            "team_id": "T0001", # that might not be right
            "team_domain": "nestio",
            "channel_id": "1934389", # maybe thats right?
            "channel_name": "lunchmove",
            "user_id": "U2147483697", # probably not right
            "user_name": "lunchbot",
            "command": "lunch_suggestion",
            "text": "burgers",
        }

        url = reverse('yelp_suggestion')
        response = self.client.get(url, data)
        print response.content