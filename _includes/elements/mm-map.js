/* move to layout??*/
$(function() {
  {% include components/mm-map-layer-switcher.js %}
  {% include components/mm-map-{{page.api}}.js %}
});
