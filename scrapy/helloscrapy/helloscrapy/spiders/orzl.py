import scrapy


class OrzlSpider(scrapy.Spider):
    name = "orzl"
    allowed_domains = ["davelee-fun.github.io"]
    start_urls = ["https://davelee-fun.github.io/"]

    def parse(self, response):
        # Field - 작업 및 명령을 내리는 공간        
        
        # css selector 방식으로 값을 찾아오는 방법
        title = response.css("h1.sitetitle::text").get() #method chaining기법 활용
        # xpath 방식을 활용해 값을 찾아오는 방법
        description = response.xpath("//p[@class='lead']/text()").get()
        
        # 크롤링에 성공한 데이터를 딕셔너리의 형태로 저장
        yield {
            "title" : title,
            "description" : description.strip()
        }