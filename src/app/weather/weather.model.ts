export class City {
    CityName: string | undefined;
    CurrentTime: Date | undefined;
    ImageUrl: string | undefined;
    latlon: latlon | undefined;
}

export class latlon{
    latitude!: number;
    longitude!: number;
}

export class Weather{
    Temp!: number;
    Date!: Date;
    ImageUrl!: string;
}