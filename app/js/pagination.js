class Pagination {
    constructor(count) {
        this.place = `.reviews__pagination`;
        this.count = count;
        this.startPage = 1;
        this.paginationList = [];

        this.render();
        this.renderItem();
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
        const Place = this.pagination.querySelector('.pagination__list')
        for (let i = this.startPage; i < this.startPage + 4; i++) {
           let pagItem = new PaginationItem(i)
        }
    }
}