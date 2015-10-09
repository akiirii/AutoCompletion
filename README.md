#Installation

## Module
    angular.module('', ['ac.autoCompletion']);

## How to run demo
    1. $ npm install
    2. $ grunt demo
    3. Open browser: *http://localhost:8888*

## How to run test
    $ grunt test


#Directive attributes

* **ac-query** - function returning promise with array of results for given $query
* **ac-minlength** - minimum string length to start a search
* **ac-delay** -  search start delay
* **ac-select** -  called with $selected when user selects record
* **ac-key** -  specify which value will be displayed


#Quick example
    <auto-completion ac-query="search($query)" ac-key="Title" ac-maxlength="maxLength" ac-delay="delay" ac-select="select($selected)"></auto-completion>
