import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Vehicle } from '../models/fleet.model';
import { catchError } from 'rxjs/operators';
import { VehicleDto } from '../interfaces/fleet.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleApiService {
  private GATEWAY = environment.gateway_fleet;
  private API = environment.api_fleet;
  private ALL_VEHICLES = '/all-vehicles';
  private VEHICLE = '/vehicle';
  private FINANCING_TYPES = '/financing_types';
  private COMBUSTIBLE_TYPES = '/combustible_types';
  private VEHICLE_TYPES = '/vehicle_types';
  private VEHICLE_MODELS = '/vehicle_models';
  private FINANCING_COMPANIES = '/financing_companies';
  private MANUFACTURERS = '/manufacturers';
  private TRANSMISSION_TYPES = '/transmission_types';
  private ENVIRONMENT_LABEL_TYPES = '/environment_label_types';

  constructor(private http: HttpClient) {}

  /* ===== API CALLS ===== */

  /**
   * Get vehicles list
   */
  getAllVehicles(): Observable<Vehicle[]> {
    /** API CALL BE */
    // return this.http
    //   .get<Vehicle[]>(this.GATEWAY + this.API + this.ALL_VEHICLES)
    //   .pipe(catchError((err) => throwError(err)));

    /** LOCAL JSON */
    // FIXME: Remove fake calls
    return this.http
      .get<Vehicle[]>('/assets/data/vehicles.json')
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Get a specific vehicle
   * @param id vehicle plate string
   */
  getVehicleDto(id: string): Observable<VehicleDto> {
    // return this.http
    //   .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, id)
    //   .pipe(catchError((err) => throwError(err)));
    return of({
      // rowId: 1,
      plate: '3145BCD',
      carframe: '0g896dh',
      modelId: 1,
      manufacturerId: 1,
      financingTypeId: 1,
      entryDate: new Date(),
      leaveDate: undefined,
      employeeId: 11199,
      assignedAtCompanyId: 1,
      mileage: 5000,
      vehicleTypeId: 1,
      fuelTypeId: 1,
      pollutingEmissions: 150,
      transmissionTypeId: 1,
      financialCompanyId: 1,
      contractNumber: 8,
      maxMileage: 12000,
      monthlyFee: 1250,
      active: true,
      environmentLabelId: 1,
      fuelConsumption: undefined,
      observations: 'Al coche fantástico no le funciona el Aire',
      vehicleId: '5964FVY',
    });
  }

  /**
   * Get a specific vehicle
   * @param id vehicle plate string
   */
  getVehicle(id: string): Observable<any> {
    // return this.http
    //   .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, id)
    //   .pipe(catchError((err) => throwError(err)));
    return of({
      rowId: 1,
      plate: '5964FVY',
      carframe: '0g896dh',
      modelName: 'Polo 1.2',
      manufacturerName: 'Volkswagen',
      financingTypeName: 'Renting',
      entryDate: new Date('01/01/2020'),
      leavingDate: null,
      employeeName: 'Pepe Domingo',
      assignedAtCompanyName: 'Central',
      mileage: 5000,
      vehicleTypeName: 'Turismo',
      fuelTypeName: 'Gasolina',
      pollutingEmissions: 150,
      transmissionTypeName: 'Manual',
      financialCompanyName: 'Cooltra',
      contractNumber: 8,
      maxMileage: 12000,
      monthlyFee: 1250,
      active: true,
      environmentLabelName: 'C',
      fuelConsumption: 5.4,
      observations: 'Al coche fantástico no le funciona el Aire',
      history: [
        {
          driver: '11199 - Rubén C',
          startDate: '01/04/2021 08:30',
          endDate: '',
        },
        {
          driver: '10624 - Antonio P.',
          startDate: '04/10/2020 08:00',
          endDate: '30/03/2021 17:30',
        },
      ],
    });
  }

  /**
   * Get vehicle financing options
   */
  getFinancingTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.FINANCING_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Renting - 48 Meses', value: 1 },
    ]);
  }

  /**
   * Get vehicle financing companies
   */
  getFinancingCompanies(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.FINANCING_COMPANIES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Alphabet', value: 1 },
      { name: 'Cooltra Motos SLU', value: 2 },
    ]);
  }

  /**
   * Get vehicle options
   */
  getVehicleTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.VEHICLE_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Turismo', value: 1 },
      { name: 'Motocicleta', value: 2 },
      { name: 'Furgoneta', value: 3 },
      { name: 'Vehículo 3 ruedas', value: 4 },
    ]);
  }

  /**
   * Get vehicle models
   */
  getVehicleModels(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.VEHICLE_MODELS)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Golf', value: 1 },
      { name: 'Polo', value: 2 },
      { name: 'Kangoo', value: 3 },
      { name: 'Tricity 125 ABS', value: 4 },
    ]);
  }

  /**
   * Get vehicle combustible options
   */
  getCombustibleTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.COMBUSTIBLE_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Gasolina', value: 1 },
      { name: 'Diesel', value: 2 },
      { name: 'Híbrido', value: 3 },
      { name: 'Eléctrico', value: 4 },
    ]);
  }

  /**
   * Get vehicle manufacturers
   */
  getManufacturers(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.MANUFACTURERS)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Volkswagen', value: 1 },
      { name: 'Renault', value: 2 },
      { name: 'Yamaha', value: 3 },
    ]);
  }

  /**
   * Get vehicle transmission options
   */
  getTransmissionTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.TRANSMISSION_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Manual', value: 1 },
      { name: 'Automática', value: 2 },
    ]);
  }

  /**
   * Get vehicle transmission options
   */
  getEnvironmentLabelTypes(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.ENVIRONMENT_LABEL_TYPES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'ZERO', value: 1 },
      { name: 'ECO', value: 2 },
      { name: 'B', value: 3 },
      { name: 'C', value: 4 },
      { name: 'D', value: 5 },
    ]);
  }

  /**
   * Get companies list
   */
  getDelegations(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.DELEGATIONS)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { name: 'Añade un nuevo valor', value: 0 },
      { name: 'Central', value: 1 },
      { name: 'Este', value: 2 },
      { name: 'Oeste', value: 3 },
      { name: 'Sur', value: 4 },
      { name: 'Norte', value: 5 },
    ]);
  }

  /**
   * Get employees list
   */
  getEmployees(): Observable<any[]> {
    // return this.http
    //   .get<any[]>(this.GATEWAY + this.API + this.EMPLOYEES)
    //   .pipe(catchError((err) => throwError(err)));
    return of([
      { employeeName: '11199 - Rubén C.', employeeId: 11199 },
      { employeeName: '12345 - Gerónimo K.', employeeId: 12345 },
      { employeeName: '9876 - Lina M.', employeeId: 9876 },
      { employeeName: '4753 - Dorotea T.', employeeId: 4753 },
    ]);
  }

  /**
   * Save a new or edited vehicle
   * @param vehicle Vehicle
   */
  saveVehicle(vehicle: Vehicle): Observable<any> {
    return this.http
      .post<Vehicle>(this.GATEWAY + this.API + this.VEHICLE, vehicle)
      .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Delete the selected vehicle
   * @param id vehicle plate string
   */
  deleteVehicle(id: string): Observable<any> {
    return this.http
      .post<string>(this.GATEWAY + this.API + this.VEHICLE, id)
      .pipe(catchError((err) => throwError(err)));
  }
}
