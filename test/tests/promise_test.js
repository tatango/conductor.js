(function() {

var qunitFixture;

module('Promise Functionality', {
  setup: function() {
    qunitFixture = document.getElementById('qunit-fixture');
  }
});

test("card references have a promise resolved when the sandbox is ready", function() {
  expect(2);
  stop();

  var conductor = newConductor(),
      card;

  card = conductor.load("/test/fixtures/empty_card.html");

  equal(undefined, card.sandbox.dataPort, "sandbox is not initially initialised");

  card.waitForLoad().then(function () {
    start();
    notEqual(undefined, card.sandbox.dataPort, "sandbox is initialised when promise is resolved");
  });
  card.appendTo(qunitFixture);
});

test("cards have a promise resolved when the card is activated", function() {
  expect(2);
  stop();

  var conductor = newConductor(),
      card;

  card = conductor.load("/test/fixtures/promise_card.html");
  card.appendTo(qunitFixture);
});

test("cards may return a promise in `activate` to defer activation", function() {
  expect(2);
  stop();

  var conductor = newConductor(),
      card;

  card = conductor.load("/test/fixtures/card_defer_activation_with_promise.html");
  card.appendTo(qunitFixture);
});

test("consumers' `error` functions are invoked if their capabilities are not provided by the environment", function() {
  expect(2);
  stop();
  stop();

  var conductor = newConductor(),
      card;

  card = conductor.load(
    "/test/fixtures/unfulfilled_capability_card.html", 
    1,
    {
      capabilities: ['fulfilledCapability'],
      services: {
        fulfilledCapability: Conductor.Oasis.Service,
        unfulfilledCapability: Conductor.Oasis.Service
      }});
  card.appendTo(qunitFixture);
});

test("errors in `activate` cause the card's promise to fail", function() {
  var conductor = newConductor(),
      card;

  stop();

  card = conductor.load("/test/fixtures/activation_error_card.html");
  card.appendTo(qunitFixture);
});

})();
