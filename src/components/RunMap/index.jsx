import MapboxLanguage from '@mapbox/mapbox-gl-language';
import React from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import useActivities from 'src/hooks/useActivities';
import {
  IS_CHINESE,
  MAIN_COLOR,
  MAPBOX_TOKEN,
  PROVINCE_FILL_COLOR,
  COUNTRY_FILL_COLOR,
} from 'src/utils/const';
import { geoJsonForMap } from 'src/utils/utils';
import RunMarker from './RunMaker';
import RunMapButtons from './RunMapButtons';
import styles from './style.module.scss';

const RunMap = ({
  title,
  viewport,
  setViewport,
  changeYear,
  geoData,
  thisYear,
  mapButtonYear,
}) => {
  const { countries, provinces } = useActivities();
  const addControlHandler = (event) => {
    const map = event && event.target;
    // set language to Chinese if you use English please comment it
    if (map && IS_CHINESE) {
      map.addControl(
        new MapboxLanguage({
          defaultLanguage: 'zh',
        })
      );
      map.setLayoutProperty('country-label-lg', 'text-field', [
        'get',
        'name_zh',
      ]);
    }
  };
  const filterProvinces = provinces.slice();
  const filterCountries = countries.slice();
  // for geojson format
  filterProvinces.unshift('in', 'name');
  filterCountries.unshift('in', 'name');

  const isBigMap = viewport.zoom <= 3;
  if (isBigMap && IS_CHINESE) {
    geoData = geoJsonForMap();
  }

  const isSingleRun =
    geoData.features.length === 1 &&
    geoData.features[0].geometry.coordinates.length;
  let startLon;
  let startLat;
  let endLon;
  let endLat;
  if (isSingleRun) {
    const points = geoData.features[0].geometry.coordinates;
    [startLon, startLat] = points[0];
    [endLon, endLat] = points[points.length - 1];
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      onLoad={addControlHandler}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <RunMapButtons
        changeYear={changeYear}
        thisYear={thisYear}
        mapButtonYear={mapButtonYear}
      />
      <Source id="data" type="geojson" data={geoData}>
        <Layer
          id="province"
          type="fill"
          paint={{
            'fill-color': PROVINCE_FILL_COLOR,
            'fill-opacity': 0.2,
          }}
          filter={filterProvinces}
        />
        <Layer
          id="countries"
          type="fill"
          paint={{
            'fill-color': COUNTRY_FILL_COLOR,
            'fill-opacity': 0.5,
          }}
          filter={filterCountries}
        />
        <Layer
          id="runs2"
          type="line"
          paint={{
            'line-color': ['get', 'color'],
            'line-width': isBigMap ? 1 : 2,
            'line-dasharray': [5, 2],
            'line-opacity': 0.4,
          }}
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
        />
      </Source>
      {isSingleRun && (
        <RunMarker
          startLat={startLat}
          startLon={startLon}
          endLat={endLat}
          endLon={endLon}
        />
      )}
      <span className={styles.runTitle}>{title}</span>
    </ReactMapGL>
  );
};

export default RunMap;
