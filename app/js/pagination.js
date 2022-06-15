class Pagination {
    constructor(count, simpleBar) {
        this.place = `.reviews__pagination`;
        this.paginationList = {};
        this.getCountElements = 4;
        this.maxCountOfShowItem = 5;
        this.simpleBar = simpleBar;

        this.startPage = 1;
        this.endPage = Math.ceil(count / this.getCountElements);

        this.activePage = 1;

        this.getFrom;
        this.getTo;

        this.init()
        this.getFromTo();
        this.render();
        this.renderItem();
        this.setEvents();
    }

    init() {
        if (this.activePage > Math.floor(this.maxCountOfShowItem / 2)) {
            this.leftEdge = this.activePage - Math.floor(this.maxCountOfShowItem / 2);
        }
        else {
            this.leftEdge = 1;
            this.rightEdge = this.endPage;
        }

        if (this.activePage <= this.endPage - Math.floor(this.maxCountOfShowItem / 2)) {
            this.rightEdge = this.leftEdge + this.maxCountOfShowItem - 1;
        }
        else {
            this.leftEdge = this.endPage - this.maxCountOfShowItem + 1;
            this.rightEdge = this.endPage;
        }
    }

    setEvents() {
        const PagList = this.pagination.querySelector('.pagination__list');
        const LeftArrow = this.pagination.querySelector('.pagination__prev-btn');
        const RightArrow = this.pagination.querySelector('.pagination__next-btn');

        PagList.addEventListener('click', (event) => {
            if (event.target.classList.contains('pagination__link')) {
                this.simpleBar.getScrollElement().scrollTop = 0;
                this.setActivePage();
                this.init();
                this.getFromTo()
                this.renderItem();
            }
        });

        LeftArrow.addEventListener('click', () => {
            if (this.activePage > this.startPage) {
                this.simpleBar.getScrollElement().scrollTop = 0;
                this.activePage -= 1;
                this.init();
                this.getFromTo()
                this.renderItem();
            }
        })

        RightArrow.addEventListener('click', () => {
            if (this.activePage < this.endPage) {
                this.simpleBar.getScrollElement().scrollTop = 0;
                this.activePage += 1;
                this.init();
                this.getFromTo()
                this.renderItem();
            }
        })
    }

    render() {
        const Place = document.querySelector(this.place);
        this.pagination = document.createElement('div');
        this.pagination.classList.add('pagination')
        this.pagination.innerHTML = ` <button class="pagination__btn pagination__prev-btn"></button>
                                       <ul class="pagination__list">
                                       </ul>
                                      <button class="pagination__btn pagination__next-btn"></button>`
        Place.append(this.pagination)
    }

    renderItem() {
        const Place = this.pagination.querySelector('.pagination__list');
        Place.innerHTML = ``;
        for (let i = this.leftEdge; i <= this.rightEdge; i++) {
            let pagItem = new PaginationItem(i);
            i === this.activePage ? pagItem.setActive() : pagItem.setNotActive();
            this.paginationList[i] = pagItem;
        }
    }

    setActivePage() {
        const PagList = this.pagination.querySelector('.pagination__list');

        for (let i in this.paginationList) {
            if (this.paginationList[i].active === true && this.paginationList[i].number != this.activePage) {
                this.activePage = this.paginationList[i].number;
                break;
            }
        }
        PagList.innerHTML = ``;

        this.paginationList = {};
        this.renderItem();
    }

    getFromTo() {
        this.getFrom = (this.activePage - 1) * 4;
        this.getTo = this.getFrom + 4;
    }
}