class PaginationItem {
    constructor(numberItem) {
        this.place = '.pagination__list';
        this.number = numberItem;
        this.active = false;
        this.acriveStyle = `pagination__link--active`

        this.render()
    }

    setEvents() {
        this.link.onclick = (event) => {
            event.preventDefault();
            this.setActive();
        }
    }


    render() {
        const Place = document.querySelector(this.place);
        this.paginationItem = document.createElement('li');
        this.paginationItem.classList.add('pagination__num-page');
        this.paginationItem.innerHTML = `<a class="pagination__link ${this.active ? this.acriveStyle : ''}" href="#">${this.number}</a>`

        this.link = this.paginationItem.querySelector('a');
        this.setEvents();
        Place.append(this.paginationItem);
    }

    setActive() {
        this.active = true;
        this.link.classList.add(`pagination__link--active`);
    }

    setNotActive() {
        this.active = false;
        this.link.classList.remove(`pagination__link--active`);
    }
}