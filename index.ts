import { Carousel } from "./scripts/Carousel"
import { CarouselItemModel } from "./scripts/CarouselItemModel"

// // DEFINE a carousel
const carrousel = new Carousel(0, [
    new CarouselItemModel("some image", "Item Model 1", "Content"),
    new CarouselItemModel("some image", "Item Model 2", "Content 2"),
    new CarouselItemModel("some image", "Item Model 3", "Content 3"),
    new CarouselItemModel("some image", "Item Model 4", "Content 4"),
    new CarouselItemModel("some image", "Item Model 5", "Content 5")]
)

carrousel.initialize()
function jumpAfter(time: number, count: number, next: boolean, completion: () => void) {
    console.log("JUMP", count)
    if (count <= 0) {
        completion()
        return
    }
    setTimeout(() => {

        if (next) {
            console.log("Next")
            carrousel.next() // <---- JUMP to the next item
        } else {
            console.log("Prev")
            carrousel.previous() // <---- JUMP to the previous item
        }
        jumpAfter(time, count - 1, next, completion)
    }, time)
}
jumpAfter(1000, 10, true, () => {
    jumpAfter(1000, 20, false, () => { })
})
console.log("CALLED")