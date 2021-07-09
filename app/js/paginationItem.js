class PaginationItem {
    constructor(numberItem) {
        this.place = '.pagination__list';
        this.number = numberItem;
        this.active = false;

        console.log(this.number)
    }

    setEvents() {
        this.paginationItem.addEventListener(`click`, () => {
            this.active = true;
            this.paginationItem.classList.add(`pagination__link--active`)
        })
    }


    render() {
        const Place = document.querySelector(this.place);
        this.paginationItem = document.createElement('li');
        this.paginationItem.classList.add('pagination__num-page');
        this.paginationItem.innerHTML = `<a class="pagination__link" href="#">${this.number}</a>`

        this.setEvents();
        Place.append(paginationItem);
    }
}