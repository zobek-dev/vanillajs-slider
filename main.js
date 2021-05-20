window.addEventListener("DOMContentLoaded",()=>{
    const $slider = document.querySelector(".slider");
    if ($slider){
        const $slide = document.querySelector(".slide");
        const $allSlides = document.querySelectorAll(".slide-item");
        const $counter = document.getElementById("index-count");
        const slidesLength = $allSlides.length; 
    
        let index=0;
        let posX1;
        let posX2;
        let initialPosition;
        let finalPosition;
        let canISlide = true;
        
        const $nextBtn = document.getElementById("nextBtn");
        const $prevBtn = document.getElementById("prevBtn");
        const $firstSlide = $allSlides[0];
        const $lastSlide= $allSlides[$allSlides.length - 1];
        
        const $cloneFirstSlide = $firstSlide.cloneNode(true);
        const $cloneLastSlide = $lastSlide.cloneNode(true);

        $counter.innerHTML = `${index + 1}/${slidesLength}`
        $slide.appendChild($cloneFirstSlide);
        $slide.insertBefore($cloneLastSlide, $allSlides[0]);
        $nextBtn.addEventListener("click",() => switchSlide("next"));
        $prevBtn.addEventListener("click",() => switchSlide("prev"));

        $slide.addEventListener("transitionend", checkIndex);

        $slide.addEventListener("mousedown", dragStart);
        $slide.addEventListener("touchstart", dragStart);
        $slide.addEventListener("touchmove", dragMove);
        $slide.addEventListener("touchend", dragEnd);
        
        window.addEventListener("resize",()=>{
            console.log("resize");
            $slide.style.left=`-${$allSlides[0].clientWidth}px`;
        })

        function dragStart(e){
            e.preventDefault();
            initialPosition = $slide.offsetLeft;
            if(e.type == "touchstart"){
                posX1 = e.touches[0].clientX;
            }else{
                posX1 = e.clientX;
                document.onmouseup = dragEnd;
                document.onmousemove = dragMove;
            }
        }

        function dragMove(e){
            if(e.type == "touchmove"){
                posX2 = posX1 - e.touches[0].clientX;
                posX1 = e.touches[0].clientX;
            }else{
                posX2 = posX1 - e.clientX;
                posX1 = e.clientX;
            }

            $slide.style.left = `${$slide.offsetLeft - posX2}px`;
        }

        function dragEnd(){
            // three posibilities:
            // 1. next slide
            // 2. previous slide
            // 3. stay still
            finalPosition = $slide.offsetLeft;
            if(finalPosition - initialPosition < -55){
                switchSlide("next","dragging");
            }else if(finalPosition - initialPosition > 55){
                switchSlide("prev","dragging");
            }else{
                $slide.classList.add("transition");
                $slide.style.left=`${initialPosition}px`;
            }

            document.onmouseup = null;
            document.onmousemove = null;
        }

        function switchSlide(arg,arg2){
            $slide.classList.add("transition");
            if (canISlide){
                if(!arg2){
                    initialPosition = $slide.offsetLeft;
                }
                if(arg == "next"){
                    $slide.style.left = `${initialPosition - $allSlides[0].offsetWidth}px`;
                    index++;
                    setTimeout(()=>{
                        $counter.innerHTML = `${index==4 ? 1 : index + 1}/${slidesLength}`;
                    },400);
                }else{
                    $slide.style.left = `${initialPosition + $allSlides[0].offsetWidth}px`;
                    index--;
                    setTimeout(()=>{
                        console.log(index)
                        $counter.innerHTML = `${index==-1 ? slidesLength : index + 1}/${slidesLength}`;
                    },400);
                }
            }
            canISlide=false;

        }

        function checkIndex(){
            $slide.classList.remove("transition");

            if(index == -1){
                $slide.style.left = `-${slidesLength * $allSlides[0].offsetWidth}px`
                index = slidesLength - 1; 
            }

            if(index == slidesLength){
                $slide.style.left = `-${1 * $allSlides[0].offsetWidth}px`;
                index=0;
            }

            canISlide=true;
        }
        
    }
})



