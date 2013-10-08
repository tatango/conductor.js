Conductor.card({
  activate: function () {
    ok(true, "Card was activated");
    start();

    var conductor = new Conductor({ testing: true });
    conductor.addDefaultCapability('xhr', Conductor.MultiplexService.extend({
      upstream: this.consumers.xhr,
      transformRequest: function (requestEvent, data) {
        data.args[0] = "alert2.js";
        return data;
      }
    }));
    conductor.load("/test/fixtures/load_card.js").appendTo(document.body);
  }
});
