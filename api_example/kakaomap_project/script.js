/* 기본적으로 API URL을 활용해 외부 데이터를 가져오면 json 이라는 형태의 파일을 찾아오게 된다. 파이썬의 딕셔너리 자료구조와 매우 흡사한 형태를 띈다*/

const url =
  "https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=camping&serviceKey=9gDYz%2FHrqCO7OqV3Fe8cXCkBnIci1D6I%2FKqCQL%2BdhzeQrdJkuWf8rKQMws90osPXHEBXD3Zyl60RD7f7owzRMA%3D%3D&_type=json";

const url01 =
  "https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=50&pageNo=1&MobileOS=ETC&MobileApp=camping&serviceKey=9gDYz%2FHrqCO7OqV3Fe8cXCkBnIci1D6I%2FKqCQL%2BdhzeQrdJkuWf8rKQMws90osPXHEBXD3Zyl60RD7f7owzRMA%3D%3D&_type=xml";

fetch(url)
  .then((response) => response.json())
  .then((result) => {
    const data = result.response.body.items.item;
    console.log(data);
    const showPosition = (position) => {
      const { latitude, longitude } =
        position.coords; /* latitude, longitue는 위도와 경도를 의미함.*/
      console.log(latitude, longitude);
      const container =
        document.getElementById(
          "map"
        ); /*document는 하나의 코드내 무수히 많이 반복할 수 있음 */

      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      var map = new kakao.maps.Map(container, options);
      /*var = variant의 약자,재선언, 재할당 등 다양한 업무를 할 수 있어 여러 개발자가 공동 개발할때 사용하지 않음(위험함) */
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLever: 10 /* 확대에 대한 여부 */,
      });

      let markers = [];

      for (var i = 0; i < data.length; i++) {
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(data[i].mapY, data[i].mapX),
        });

        markers.push(marker);

        var infowindow = new kakao.maps.InfoWindow({
          content: data[i].facltNm,
        });

        function makeOverListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }

        function makeOutListener(infowindow) {
          return function () {
            infowindow.close();
          };
        }

        kakao.maps.event.addListener(
          marker,
          "mouseover",
          makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(
          marker,
          "mouseout",
          makeOutListener(infowindow)
        );
      }

      clusterer.addMarkers(markers);
    };
    const errorPosition = (error) => {
      alert(error.message);
    };

    window.navigator.geolocation.getCurrentPosition(
      showPosition,
      errorPosition
    ); /*geolocation.getCurrentPosition은 위도와 경도를 받아오는 함수 */
  });
