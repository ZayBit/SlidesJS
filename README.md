# Slides.js
Slideshow vertical y horizontal responsivo, crear una pagina deslizante
![](1.gif)
##  Uso y opciones
> **html**
```html
    <div class="container">
        <div class="vt-section current-item-displayed">
            <h1>Section #1</h1>
        </div>
        <div class="vt-section second-item slideshow-container" >
            <div class="slideshow-controls">
                <button class="btn prev-slide">
                    btn-prev
                </button>
                <button class="btn next-slide">
                    btn-next
                </button>
            </div>
            <div class="slideshow">
                <div class="slide">
                    <h1>Item slide 1</h1>
                </div>
                <div class="slide">
                 <h1>Item slide 2</h1>
             </div>
            </div>
        </div>
    </div>
```
> **css**
```scss
    .container{
        height:100vh;
        overflow: hidden;
    }
    // verticalSections
    .vt-section{
        width:100%;
        height:100vh;
        position: relative;
    .row-content{
        display: flex;
        flex-direction: row;
        height:100%;
        .separator{
            width:50%;
        }
        }
    }
    // mainSlideshow
    .slideshow-container{
    // slideShowContent
    .slideshow{
        display: flex;
        flex-direction: row;
        height:100%;
        .slide{
            width:100%;
            height:100%;
        }
    }
}
```
> **javascript**
```javascript
// inicializar
new Slides({
    verticalSections:'.vt-section',
    mainSlideshow: '.slideshow-container'
});

```


| Tipo | Propiedad | Por defecto | Descripcion |
|------|-----------|-------------|-------------|
| **string** | **verticalSections** | **null** | clase de los elementos en vertical |
| **string** | **mainSlideshow** | **null** | clase de los elementos en horizontal |
| **string** | **slideShowContent** | **".slideshow"** | clase del contenedor de los elementos a mostrar |
| **number** | **slideTransition** | **600** | tiempo de transicion de un elemento a otro en el **slideShowContent** en **ms** |
| **boolean** | **autoPlay** | **false** | reproduccion automatica del **slideShowContent** |
| **boolean** | **infinite** | **false** | transicion infinita de un elemento a otro |
| **string** | **classBtnNext** | **".next-slide"** | boton para avanzar en el **slideShowContent** |
| **string** | **classBtnPrev** | **".prev-slide"** | boton para retroceder en el **slideShowContent** |
| **string** | **verticalTransition** | **"900ms"** | transicion de un elemento a otro en vertical |
| **string** | **verticalCurrentClass** | **null** | añadir una clase al elemento actual en vertical |
| **boolean** | **deleteVerticalClass** | **true** | remueve las clases las clases añadidas de todos los elementos pero no la del emeneto actual |
| **string** | **horizontalCurrentClass** | **null** | añadir una clase al elemento actual en horizontal |
| **boolean** | **deleteHorizontalClass** | **true** | remueve las clases las clases añadidas de todos los elementos pero no la del emeneto actual |
