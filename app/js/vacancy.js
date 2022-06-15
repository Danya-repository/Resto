class Vacancy {
    constructor({category, position, description}) {
        this.place = `.vacancies__list`;
        this.email = `stivenban777@gmail.com`;

        this.category = category;
        this.position = position;
        this.description = description;
    }

    render() {
        const Place = document.querySelector(this.place);
        Place.innerHTML += `<li class="vacancies__item mix ${this.category}">
                                <div class="vacancies__top-wrapper">
                                  <span class="vacancies__title">${this.position}</span>
                                  <a class="vacancies__button" href="mailto:${this.email}">Отправить резюме</a>
                                </div>
                                <p class="vacancies__description">${this.description}</p>
                            </li>`
    }

}

