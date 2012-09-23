test("删除字符串2边空格", function (assert) {
  ok( trim("a") === "a" , 'trim("a") === "a"');
  ok( trim(" a") === "a", 'trim(" a") === "a"' );
  ok( trim("a ") === "a", 'trim("a ") === "a"' );
  ok( trim(" a ") === "a", 'trim(" a ") === "a"' );
  ok( trim(" sdk app ") === "sdk app" , 'trim(" sdk app ") === "sdk app"' );
  
  ok( trim(true) === "true" , 'trim(true) === "true"'   ) ;
});