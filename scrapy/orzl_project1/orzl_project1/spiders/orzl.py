import scrapy


class OrzlSpider(scrapy.Spider):
    name = "orzl"
    allowed_domains = ["davelee-fun.github.io"]
    start_urls = ["https://davelee-fun.github.io"]

    def parse(self, response):
        pass
