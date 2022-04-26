export interface Uzytkownik {
    id: number;
    login: string;
    haslo: string;
    imie: string;
    nazwisko: string;
    nr_telefonu: string;
    email: string;
    wynik: number;
    czy_administrator: number;
}

//Odpowiada za model danych użytkownika