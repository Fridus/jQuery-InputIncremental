# jQuery - InputIncremental
[![Bower version](https://img.shields.io/bower/v/jquery-inputincremental.svg?style=flat)](http://bower.io/search/?q=jquery-inputincremental)

You can increment or decrement with buttons or keyboard

![Inputs examples](http://fridus.github.io/jQuery-InputIncremental/images/example.png "Examples")

## Usage
```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>

<script type="text/javascript" src="../jquery.ba-throttle-debounce.min.js"></script>
<script type="text/javascript" src="../jquery.inputIncremental.js"></script>
<!-- OR -->
<script type="text/javascript" src="../jquery.inputIncremental.full.js"></script>
```
```
$(function(){
    $('.myInputs').inputIncremental();
    $('.myInputs2').inputIncremental({minVal: 1});
});
```
[Demo](http://fridus.github.io/jQuery-InputIncremental)

## Install with bower
```
bower install jquery-inputincremental
```

## Dependencies

#### Javascript

- jQuery
- `jquery.ba-throttle-debounce` (included in full version)

## Options

- `value`: number incrementation (default 1)
- `minVal` (default 0)
- `maxVal` (default null)
- `throttle` (default 1000)
- `autocomplete` (default false)
- `negative`: authorize negative value (default false)
- `integer`: force integer value (default false)

#### Metadata
- `data-value`
- `data-min-val`
- `data-max-val`
- `data-throttle`
- `data-theme`
- `data-negative`
- `data-integer`

## Themes with sass or compass

#### Default themes

```
<input type="text" class="inc" value="0"/>
<input type="text" data-theme="blueTheme" class="inc" />
<input type="text" data-theme="greenTheme" class="inc"/>
```

#### Create theme

main.scss
```
@import "inputIncremental/_style";

.orangeTheme { // name of theme
  @include createTheme($gradient1: #EAD66E, $gradient2: #D88316, $gradient3: #EAE56E, $border_color:#AF420E, $boxShadow: 1px 1px 6px #AF420E)
}
.redTheme {
  @include createThemeByColor(#F00);
}
```
