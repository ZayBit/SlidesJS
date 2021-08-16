class Slides {
    #VerticalSectionsClass = ''
    #mainSlideshow = ''
    #slideShowContent = ''
    #slideTransition = 0
    #verticalTransition = ''
    #autoPlay = false
    #infinite = false
    #classBtnNext = ''
    #classBtnPrev = ''
    #currentHorizontalPosition = []
    #verticalSectionsHeight = 0;
    #currentSectionVertical = 0;
    #verticalCurrentClass = ''
    #horizontalCurrentClass = ''
    #deleteVerticalClass = true;
    #deleteHorizontalClass = true;
    constructor(config = {}) {
        const {
            verticalSections = null,
            mainSlideshow = null,
            slideShowContent = '.slideshow',
            slideTransition = 600,
            autoPlay = false,
            infinite = false,
            classBtnNext = '.next-slide',
            classBtnPrev = '.prev-slide',
            verticalTransition = '900ms',
            verticalCurrentClass = null,
            deleteVerticalClass = true,
            horizontalCurrentClass = null,
            deleteHorizontalClass = true
        } = config;
        this.#VerticalSectionsClass = verticalSections;
        this.#mainSlideshow = mainSlideshow;
        this.#slideShowContent = slideShowContent;
        this.#slideTransition = slideTransition;
        this.#autoPlay = autoPlay;
        this.#infinite = infinite;
        this.#classBtnNext = classBtnNext;
        this.#classBtnPrev = classBtnPrev;
        this.#verticalTransition = verticalTransition;
        this.#verticalCurrentClass = verticalCurrentClass;
        this.#deleteVerticalClass = deleteVerticalClass;
        this.#horizontalCurrentClass = horizontalCurrentClass;
        this.#deleteHorizontalClass = deleteHorizontalClass;
        this.#init()
    }
    #init = () => {
        if (this.#VerticalSectionsClass) {
            this.#VerticalSections()
        }
        if (this.#mainSlideshow) {
            this.#HorizontalSections()
        }
        this.#Resize()
    }
    #Resize = () => {
        window.addEventListener('resize', () => {
            // vertical responsive
            if (this.#VerticalSectionsClass) {
                let verticalSections = document.querySelectorAll(this.#VerticalSectionsClass);
                this.#verticalSectionsHeight = window.innerHeight;
                verticalSections.forEach(section => {
                    section.style.transition = 'all 100ms ease';
                })
                verticalSections[0].style = `margin-top:-${this.#verticalSectionsHeight * this.#currentSectionVertical}px;`;
            }
            // horizontal responsive
            if (this.#mainSlideshow) {
                let mainSlideshow = document.querySelectorAll(this.#mainSlideshow);
                mainSlideshow.forEach((slideshowContainer, index) => {
                    let slideshow = slideshowContainer.querySelector('.slideshow'),
                        slides = slideshow.querySelectorAll('.slide'),
                        slidesLength = slides.length,
                        currentHorizontalPosition = this.#currentHorizontalPosition;
                    slideshow.style.transition = 'none';
                    if (currentHorizontalPosition[index] != undefined) {
                        if (this.#infinite) {
                            if (currentHorizontalPosition[index] == slidesLength - 1) {
                                slideshow.style.marginLeft = '-0px';
                            } else if (currentHorizontalPosition[index] == 0) {
                                slideshow.style.marginLeft = `-${slides[0].clientWidth * (slidesLength - 1)}px`;
                            } else {
                                slideshow.style.marginLeft = `-${slideshowContainer.clientWidth * currentHorizontalPosition[index]}px`
                            }
                        } else {
                            slideshow.style.marginLeft = `-${slideshowContainer.clientWidth * currentHorizontalPosition[index]}px`
                        }
                    }
                });
            }

        })
    }
    #RemoveClass = (elements, cls) => {
        Array.from(elements).forEach(el => {
            el.classList.remove(cls)
        })
    }
    #HorizontalSections = () => {
        const slideshows = document.querySelectorAll(this.#mainSlideshow);
        let infinite = this.#infinite,
            slideTransition = this.#slideTransition,
            currentHorizontalPosition = this.#currentHorizontalPosition;
        slideshows.forEach((slideshow, index) => {
            const slideContainer = slideshow.querySelector(this.#slideShowContent),
                slideItems = slideContainer.children,
                slideLength = slideItems.length,
                slideButtonPrev = slideshow.querySelector(this.#classBtnPrev),
                slideButtonNext = slideshow.querySelector(this.#classBtnNext);
            if (this.#horizontalCurrentClass) {
                slideItems[0].classList.add(this.#horizontalCurrentClass)
            }
            let slideStyle = slideContainer.style,
                delayAutoplay = false,
                continueSlide = true,
                currentSlide = (infinite) ? 1 : 0;
            if (infinite) {
                let lastItemClone = slideItems[slideLength - 1].cloneNode(true);
                slideContainer.insertBefore(lastItemClone, slideItems[0])
                slideStyle.marginLeft = `-100%`;
            }
            slideStyle.width = `${(infinite) ? slideLength + 1 : slideLength}00%`;
            if (this.#autoPlay) {
                let counter = 0;
                setInterval(() => {
                    counter++;
                    if (delayAutoplay) counter = 0;
                    if (counter >= slideTransition) {
                        NextSlide()
                        counter = 0;
                    }
                })
            }
            slideButtonPrev.addEventListener('click', () => PrevSlide());
            slideButtonNext.addEventListener('click', () => NextSlide());
            const PrevSlide = () => {
                if (!continueSlide) return;
                delayAutoplay = true;
                if (currentSlide == 0 && infinite) {
                    slideStyle.transition = `none`;
                    slideStyle.marginLeft = `-${slideItems[0].clientWidth * slideLength}px`;
                    currentSlide = slideLength;
                }
                if (currentSlide <= 0 && infinite) {
                    currentSlide = slideLength + 1;
                } else if (currentSlide <= 0 && !infinite) {
                    currentSlide = slideLength;
                }
                currentSlide--;
                currentHorizontalPosition[index] = currentSlide;

                if (this.#horizontalCurrentClass) {
                    if (this.#deleteHorizontalClass) {
                        this.#RemoveClass(slideItems, this.#horizontalCurrentClass)
                    }
                    if (currentSlide == 0) {
                        if (!slideItems[slideLength].classList.contains(this.#horizontalCurrentClass)) {
                            slideItems[slideLength].classList.add(this.#horizontalCurrentClass)
                            slideItems[currentSlide].classList.add(this.#horizontalCurrentClass)
                        }
                    } else {
                        if (!slideItems[currentSlide].classList.contains(this.#horizontalCurrentClass)) {
                            slideItems[currentSlide].classList.add(this.#horizontalCurrentClass)
                        }
                    }
                }
                setTimeout(() => {
                    slideStyle.marginLeft = `-${slideItems[0].clientWidth * currentSlide}px`;
                    slideStyle.transition = `all ${slideTransition}ms ease`;
                }, 20)
                setTimeout(() => {
                    if (currentSlide == 0 && infinite) {
                        currentSlide = slideLength;
                        slideStyle.marginLeft = `-${slideItems[0].clientWidth * slideLength}px`;
                        slideStyle.transition = `none`;
                    }
                    delayAutoplay = false;
                    continueSlide = true;
                }, slideTransition)
                continueSlide = false;
            }
            const NextSlide = () => {
                if (!continueSlide) return;
                delayAutoplay = true;
                if (currentSlide == slideLength && infinite) {
                    slideStyle.transition = `none`;
                    slideStyle.marginLeft = `-0px`;
                }
                currentSlide++;
                if (currentSlide >= slideLength + 1 && infinite) {
                    currentSlide = 1;
                } else if (currentSlide > slideLength - 1 && !infinite) {
                    currentSlide = 0;
                }

                currentHorizontalPosition[index] = currentSlide;
                if (this.#horizontalCurrentClass) {
                    if (this.#deleteHorizontalClass) {
                        this.#RemoveClass(slideItems, this.#horizontalCurrentClass)
                    }
                    if (currentSlide == slideLength) {
                        if (!slideItems[0].classList.contains(this.#horizontalCurrentClass)) {
                            slideItems[slideLength].classList.add(this.#horizontalCurrentClass)
                            slideItems[0].classList.add(this.#horizontalCurrentClass)
                        }
                        if (this.#deleteHorizontalClass) {
                            setTimeout(() => {
                                slideItems[slideLength].classList.remove(this.#horizontalCurrentClass)
                            }, slideTransition)
                        }
                    } else {
                        if (!slideItems[currentSlide].classList.contains(this.#horizontalCurrentClass)) {
                            slideItems[currentSlide].classList.add(this.#horizontalCurrentClass)
                        }
                    }
                }
                setTimeout(() => {
                    slideStyle.transition = `all ${slideTransition}ms ease`;
                    slideStyle.marginLeft = `-${slideItems[0].clientWidth * currentSlide}px`;
                }, 20)
                setTimeout(() => {
                    if (currentSlide == slideLength && infinite) {
                        currentSlide = 0;
                        slideStyle.marginLeft = `-0px`;
                        slideStyle.transition = `none`;
                    }
                    delayAutoplay = false;
                    continueSlide = true;
                }, slideTransition)
                continueSlide = false;
            }
        })
    }
    #VerticalSections = () => {
        const verticalSections = document.querySelectorAll(this.#VerticalSectionsClass),
            containerControls = document.createElement('div'),
            verticalSectionsLength = verticalSections.length;
        containerControls.className = 'controls';
        document.body.appendChild(containerControls);
        containerControls.innerHTML = '<ul></ul>';
        let verticalTransition = '',
            dataTransition = '',
            verticalSectionsHeight = (verticalSections[0]) ? verticalSections[0].clientHeight : 0,
            actionReady = true,
            currentSectionVertical = 0,
            wheelCurrentPosition = 0;
        this.#verticalSectionsHeight = verticalSectionsHeight;
        for (let i = 0; i < verticalSectionsLength; i++) {
            containerControls.querySelector('ul').innerHTML += `<li><button ${(i <= 0) ? 'class="current-button"' : ''}></button></li>`;
        }
        const verticalSectionsButtons = document.querySelectorAll('.controls button');
        const CurrentClassSection = (index) => {
            if (this.#verticalCurrentClass) {
                if (this.#deleteVerticalClass) {
                    this.#RemoveClass(verticalSections, this.#verticalCurrentClass)
                }
                if (!verticalSections[index].classList.contains(this.#verticalCurrentClass)) {
                    verticalSections[index].classList.add(this.#verticalCurrentClass)
                }
            }
        }
        verticalSectionsButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (actionReady) {
                    SetNewTransition(index);
                    verticalSectionsButtons[currentSectionVertical].classList.remove('current-button');
                    verticalSectionsButtons[index].classList.add('current-button');
                    wheelCurrentPosition = index;
                    verticalSections[0].style = `margin-top:-${verticalSectionsHeight * index}px;transition: all ${verticalTransition} ease;`;
                    verticalSections[currentSectionVertical].classList.remove('current-item-displayed')
                    verticalSections[index].classList.add('current-item-displayed');
                    currentSectionVertical = index;
                    this.#currentSectionVertical = index;
                    CurrentClassSection(index)
                }
            })
        });
        document.addEventListener('wheel', (e) => {
            if (actionReady) {
                actionReady = false;
                if (e.deltaY > 0) {
                    wheelCurrentPosition++;
                    if (wheelCurrentPosition <= verticalSectionsLength - 1) {
                        SectionPosition();
                    } else {
                        wheelCurrentPosition = verticalSectionsLength - 1;
                    }
                    CurrentClassSection(wheelCurrentPosition)
                } else {
                    if (wheelCurrentPosition >= 1) {
                        wheelCurrentPosition--;
                        SectionPosition();
                    }
                    CurrentClassSection(wheelCurrentPosition)
                }
                setTimeout(function () {
                    actionReady = true;
                }, 1000)
            }
        })
        const SectionPosition = () => {
            SetNewTransition(wheelCurrentPosition);
            verticalSectionsHeight = this.#verticalSectionsHeight;
            verticalSectionsButtons[currentSectionVertical].classList.remove('current-button');
            verticalSectionsButtons[wheelCurrentPosition].classList.add('current-button');
            verticalSections[0].style = `margin-top:-${verticalSectionsHeight * wheelCurrentPosition}px;transition: all ${verticalTransition} ease;`;
            verticalSections[currentSectionVertical].classList.remove('current-item-displayed')
            verticalSections[wheelCurrentPosition].classList.add('current-item-displayed');
            currentSectionVertical = wheelCurrentPosition;
            this.#currentSectionVertical = wheelCurrentPosition;
        }
        const SetNewTransition = (index) => {
            dataTransition = verticalSections[index].dataset.transition;
            if (dataTransition) {
                verticalTransition = dataTransition;
            } else {
                verticalTransition = this.#verticalTransition;
            }
        }
    }
}
