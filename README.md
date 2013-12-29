# jQuery - InputIncremental

***

You can increment or decrement with buttons or keyboard

![Inputs examples](site/examples.png "Examples")

## Usage
```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="../jquery.ba-throttle-debounce.min.js"></script>
<script type="text/javascript" src="../jquery.inputIncremental.js"></script>
```
```
$(function(){
    $('.myInputs').inputIncremental();
    $('.myInputs2').inputIncremental({minVal: 1});
});
```
[Examples](site/index.html)

## Dependencies

#### Javascript

- jQuery
- `jquery.ba-throttle-debounce`

#### CSS

- `@import "compass/css3";`

## Options

- value: number incrementation (default 1)
- minVal (default 0)
- maxVal (default null)
- throttle (default 1000)
- autocomplete (default false)
