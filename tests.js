QUnit.test( "Test does nothing", function( assert ) {
    let i = mutateIndex([], 0, null, null);

    assert.equal( i, 0 );
});

QUnit.test( "Test moves right", function( assert ) {
    let i = mutateIndex(["one", "two"], 0, 1, null);

    assert.equal( i, 1 );
});

QUnit.test( "Test loops when moving left", function( assert ) {
    let i = mutateIndex(["one", "two"], 0, -1, 1);

    assert.equal( i, 1 );
});

QUnit.test( "Test loops when moving right", function( assert ) {
    let i = mutateIndex(["one", "two"], 1, 1, null);

    assert.equal( i, 0 );
});

QUnit.test( "Test add param", function( assert ) {
    let url = setParamValue("go.co", "date", "myDate");

    assert.equal( url, "go.co?date=myDate" );
});

QUnit.test( "Test add additional param", function( assert ) {
    let url = setParamValue("go.co?yo=sup", "date", "myDate");

    assert.equal( url, "go.co?yo=sup&date=myDate" );
});

QUnit.test( "Test updates param", function( assert ) {
    let url = setParamValue("go.co?date=oldDate", "date", "myDate");

    assert.equal( url, "go.co?date=myDate" );
});

QUnit.test( "Test updates dates", function( assert ) {
    let url = setParamValue("go.co?date=2018-11-2", "date", "2018-11-3");

    assert.equal( url, "go.co?date=2018-11-3" );
});

QUnit.test( "Test get param", function( assert ) {
    let value = getParamValue("go.co?date=2018-11-2", "date");

    assert.equal( value, "2018-11-2" );
});

QUnit.test( "Get today's index", function( assert ) {
    let i = getTargetIndex();

    assert.equal( i, null );
});

QUnit.test( "Get today's index with dates and today", function( assert ) {
    let i = getTargetIndex(["2018-1-1", "2018-1-2", "2018-1-3"], "2018-1-2");

    assert.equal( i, 1 );
});

QUnit.test( "Test get index retrieves nearest previous index when today not available", function( assert ) {
    let i = getTargetIndex(["2018-1-1"], "2018-1-2");

    assert.equal( i, 0 );
});

QUnit.test( "Test get index takes looping into account for days", function( assert ) {
    let i = getTargetIndex(["2018-1-1", "2018-1-3"], "2018-1-2");

    assert.equal( i, 0 );
});

QUnit.test( "Test get index takes looping into account for months", function( assert ) {
    let i = getTargetIndex(["2018-1-1", "2018-3-1"], "2018-2-1");

    assert.equal( i, 0 );
});

QUnit.test( "Test get param when not there", function( assert ) {
    let value = getParamValue("go.co", "date");

    assert.equal( value, null );
});

QUnit.test( "Test get target index returns null when no target", function( assert ) {
    let i = getTargetIndex(["2018-1-1", "2018-1-2", "2018-1-3"], null);

    assert.equal( i, null );
});

QUnit.test( "Test strips hash", function( assert ) {
    let url = setParamValue("go.co#", "date", "myDate");

    assert.equal( url, "go.co?date=myDate" );
});

QUnit.test( "Test should show next button", function( assert ) {
    let result = shouldShowNext();

    assert.equal( result, false );
});

QUnit.test( "Test should show next button returns true", function( assert ) {
    let result = shouldShowNext(0, ["2018-1-1", "2018-1-2"], "2018-1-2");

    assert.equal( result, true );
});

QUnit.test( "Test does not loop into future", function( assert ) {
    let i = mutateIndex(["2018-1-2", "2018-1-3"], 0, -1, 0);

    assert.equal( i, 0 );
});

QUnit.test( "Test remove all params", function( assert ) {
    let url = removeQueryString("go.co?date=2018-11-2");

    assert.equal( url, "go.co" );
});