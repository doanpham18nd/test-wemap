import React, { useEffect, useRef, useState } from 'react'

const Map = (props) => {
  const { getLatLong } = props
  const [map, setMap] = useState('')
  const mapRef = useRef()
  useEffect(() => {
    let s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = `/map/js/wemap-gl.js`
    let x = document.getElementsByTagName('script')[0]
    x.parentNode.insertBefore(s, x)
    let head = document.getElementsByTagName('head')[0]
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = '/map/css/wemap.min.css'
    head.appendChild(link)
    s.addEventListener('load', () => {
      setMap(
          new window.wemapgl.WeMap({
            container: mapRef.current,
            // center: lat && lat !== 'null' && long && long !== 'null' ? [long, lat] : [104.898590, 21.716768],
            center: [104.29080285289433, 21.79813530744832],
            key: 'zZjAMHCwZAHTQqXIvigmZOXNiI',
            urlController: 'false',
            // traffic: true,
            zoom: 8.5,
          })
      )
    })
  }, [])
  useEffect(() => {
    if (map) {
      map.on('load', function () {
        map.addSource('source_id_name', {
          type: 'geojson',
          data: '/map/yenbai.geojson',
        })

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'source_id_name',
          paint: {
            'line-color': '#007050',
            'line-width': 3,
          },
        })
      })
      // mapRef.current.addEventListener('click', function (e) {
      //     console.log(e.lngLat)
      //     e.on('click', function (e2) {
      //         let latLong = e2.lngLat;
      //         console.log("latLong: ", latLong);
      //     });
      // })
      map.on('click', function (e) {
          let latLong = e.lngLat;
      console.log("latLong: ", latLong);
      });
      map.on('move', () => {
        let data = {
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        };
        console.log(data)
      });
    }
  }, [map])

  return (
      <div>
        <div
            ref={mapRef}
            style={{ top: 60 }}
            id="map"
            // onClick={() => getLatLong(map)}
        />
        {/*<button onClick={() => getLatLong(map)}>Click to Focus</button>*/}
      </div>
  )
}

export default Map
