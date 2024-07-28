import { CarouselActiveItemIndexManager } from "./CarouselActiveItemIndexManager"
import { CarouselItemContainersManager } from "./CarouselItemContainersManager"
import { CarouselItemModel } from "./CarouselItemModel"

export class Carousel{
    id: number
    carouselItems: Array<CarouselItemModel>
    carouselActiveItemIndexManager: CarouselActiveItemIndexManager
    carouselItemContainersManager: CarouselItemContainersManager
    constructor(id: number, carousel_items: Array<CarouselItemModel>){
        this.id = id
        this.carouselItems = carousel_items
        this.carouselActiveItemIndexManager = new CarouselActiveItemIndexManager(carousel_items.length)
        this.carouselItemContainersManager = new CarouselItemContainersManager(id)
    }
    
    initialize(){
        this.carouselItemContainersManager.initialize(this.carouselItems[0])
    }

    next(){
        const itemIndex = this.carouselActiveItemIndexManager.next()
        //console.log("next item" ,itemIndex)
        this.carouselItemContainersManager.next(this.carouselItems[itemIndex])
    }

    previous(){
        const itemIndex = this.carouselActiveItemIndexManager.previous()
        this.carouselItemContainersManager.previous(this.carouselItems[itemIndex])
    }
   
}