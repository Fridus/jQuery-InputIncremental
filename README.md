# jQuery - InputIncremental

***

You can increment or decrement with buttons or keyboard

![Inputs examples](http://fridus.github.io/jQuery-InputIncremental/images/example.png "Examples")

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
[Examples](http://fridus.github.io/jQuery-InputIncremental)

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

## Themes with compass

#### Default themes

```
<input type="text" class="inc" value="0"/>
<input type="text" data-theme="blueTheme" class="inc" />
<input type="text" data-theme="greenTheme" class="inc"/>
```

#### Create theme

main.scss
```
@import "compass/css3";
@import "inputIncremental/_style";

.orangeTheme { // name of theme
  @include createTheme($gradient1: #EAD66E, $gradient2: #D88316, $gradient3: #EAE56E, $border_color:#AF420E, $boxShadow: 1px 1px 6px #AF420E)
}
.redTheme {
  @include createThemeByColor(#F00);
}
```
