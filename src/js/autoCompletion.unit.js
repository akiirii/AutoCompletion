describe("AutoCompletion ", function() {
    var $compile,
        $rootScope,
        testEventKeyup,
        testEventClick;

    beforeEach(module('ac.autoCompletion'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $timeout = _$timeout_;

        testEventKeyup = document.createEvent("Events");
        testEventKeyup.initEvent('keyup', true, false);

        testEventClick = document.createEvent("Events");
        testEventClick.initEvent('click', true, false);
    }));

    it('should have a default value for delay', function() {
        //given
        var element = $compile('<auto-completion> < /auto-completion>')($scope)
        var isolated = element.isolateScope();

        //when
        $scope.$digest();

        //then
        expect(isolated.delay).toBe(500);
    });

    it('should have a default value for maxlength', function() {
        //given
        var element = $compile('<auto-completion> < /auto-completion>')($scope)
        var isolated = element.isolateScope();

        //when
        $scope.$digest();

        //then
        expect(isolated.maxlength).toBe(3);
    });

    it('should provide values from scope to isolate scope', function() {
        //given
        $scope.minlength = 5;
        $scope.delay = 100;
        $scope.search = function(query) {};
        $scope.select = function(selected) {};

        var element = $compile(
            '<auto-completion ac-minlength="minlength" ac-delay="delay" ac-query="search($query)" ac-select="select($selected)"> < /auto-completion>'
        )($scope)
        var isolated = element.isolateScope();

        //when
        $scope.$digest();

        //then
        expect(isolated.delay).toBe(100);
        expect(isolated.minlength).toBe(5);
        expect(typeof(isolated.queryFunction)).toEqual('function');
        expect(typeof(isolated.export)).toEqual('function');

    });

    it('should call queryFunction when user press any key and guery has chart more then minlength value',
        function(done) {
            //given
            $scope.search = function(query) {
                //then
                done(); //sucess
            };
            var element = $compile('<auto-completion  ac-query="search($query)"> < /auto-completion>')(
                $scope)
            var isolated = element.isolateScope();

            //when
            $scope.$digest();

            input = element.find('input');
            isolated.query = 'test';

            testEventKeyup.keyCode = 65
            input.triggerHandler(testEventKeyup)
            $timeout.flush();

        });

    it('should call export when user press enter', function() {
        //given
        var selectedQuery;
        $scope.select = function(selected) {
            selectedQuery = selected;
        };
        var element = $compile('<auto-completion ac-select="select($selected)"> < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        $scope.$digest();

        input = element.find('input');
        isolated.query = 'abc';
        isolated.marked = {
            name: 'test'
        }
        testEventKeyup.keyCode = 13
        input.triggerHandler(testEventKeyup)
        $timeout.flush();

        //then
        expect(selectedQuery).toEqual(isolated.marked);
    });

    it('should call export when user click on some list element', function() {
        //given
        var selectedQuery;
        $scope.select = function(selected) {
            selectedQuery = selected;
        };
        var element = $compile('<auto-completion  ac-select="select($selected)"> < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: 'test'
        }]
        $scope.$digest();

        li = element.find('li');
        li.triggerHandler(testEventClick)

        //then
        expect(selectedQuery.name).toBe('test');
    });

    it('should change query when user select some list element', function() {
        //given
        var element = $compile('<auto-completion> </auto-completion>')($scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: 'test'
        }]
        $scope.$digest();

        li = element.find('li');
        li.triggerHandler(testEventClick)

        //then
        expect(isolated.query).toBe('test');
    });

    it('should clean searchlist when user select some list element', function() {
        //given
        var selectedQuery;
        var element = $compile('<auto-completion> </auto-completion>')($scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: 'test'
        }]
        $scope.$digest();

        li = element.find('li');
        li.triggerHandler(testEventClick)

        //then
        expect(isolated.searchlist).toEqual([]);
    });

    it('should mark first element when user press down arrow', function() {
        //given
        var selectedQuery;

        var element = $compile('<auto-completion  > < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: '1'
        }, {
            name: '2'
        }]
        $scope.$digest();

        input = element.find('input');

        testEventKeyup.keyCode = 40
        input.triggerHandler(testEventKeyup)

        //then
        expect(isolated.marked.name).toBe('1');
    });


    it('should mark second element when user press twice down arrow', function() {
        //given
        var selectedQuery;

        var element = $compile('<auto-completion  > < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: '1'
        }, {
            name: '2'
        }]
        $scope.$digest();

        input = element.find('input');

        testEventKeyup.keyCode = 40
        input.triggerHandler(testEventKeyup)
        input.triggerHandler(testEventKeyup)

        //then
        expect(isolated.marked.name).toBe('2');
    });

    it('should mark second element when user press third down arrow', function() {
        //given
        var selectedQuery;

        var element = $compile('<auto-completion  > < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: '1'
        }, {
            name: '2'
        }]
        $scope.$digest();

        input = element.find('input');

        testEventKeyup.keyCode = 40
        input.triggerHandler(testEventKeyup)
        input.triggerHandler(testEventKeyup)
        input.triggerHandler(testEventKeyup)

        //then
        expect(isolated.marked.name).toEqual('2');
    });

    it('should mark first element when user press down arrow and up arrow', function() {
        //given
        var selectedQuery;

        var element = $compile('<auto-completion  > < /auto-completion>')(
            $scope)
        var isolated = element.isolateScope();

        //when
        isolated.searchlist = [{
            name: '1'
        }, {
            name: '2'
        }]
        $scope.$digest();

        input = element.find('input');

        testEventKeyup.keyCode = 40
        input.triggerHandler(testEventKeyup)
        testEventKeyup.keyCode = 38
        input.triggerHandler(testEventKeyup)

        //then
        expect(isolated.marked.name).toBe('1');
    });


});
