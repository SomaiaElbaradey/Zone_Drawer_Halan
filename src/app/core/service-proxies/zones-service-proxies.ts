import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ZonesServiceProxies {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "https://zones-backend-halan.herokuapp.com";
    }

    postZone(model: ZoneVm): Observable<any> {
        let url_ = this.baseUrl + "/zones";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(model);

        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };


        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processSave(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processSave(<any>response_);
                } catch (e) {
                    return <Observable<any>><any>_observableThrow(e);
                }
            } else
                return <Observable<any>><any>_observableThrow(response_);
        }));
    }


    getAll(): Observable<any> {
        let url_ = this.baseUrl + "/zones";
        url_ = url_.replace(/[?&]$/, "");

        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<any>><any>_observableThrow(e);
                }
            } else
                return <Observable<any>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<any> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                return _observableOf(resultData200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob);
        }
        return _observableOf<any>(<any>null);
    }

    protected processSave(response: HttpResponseBase): Observable<any> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return _observableOf({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob);
        }
        return _observableOf<any>(<any>null);
    }


    delete(id: string | undefined): Observable<Response> {
        let url_ = this.baseUrl + "/zones/";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };
        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDelete(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<Response>><any>_observableThrow(e);
                }
            } else
                return <Observable<Response>><any>_observableThrow(response_);
        }));
        
    }

    protected processDelete(response: HttpResponseBase): Observable<Response> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;
        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            return _observableOf(result200);
            }));
        } 
        return _observableOf<Response>(<any>null);
    }
}




export class ZoneVm implements IZoneVm {
    label!: string | undefined;
    color!: string | undefined;
    points!: any[] | undefined;

    constructor(data?: IZoneVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data["label"];
            this.color = _data["color"];
            this.points = _data["points"];
        }
    }

    static fromJS(data: any): ZoneVm {
        data = typeof data === 'object' ? data : {};
        let result = new ZoneVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["label"] = this.label;
        data["color"] = this.color;
        data["points"] = this.points;
        return data;
    }

    clone(): ZoneVm {
        const json = this.toJSON();
        let result = new ZoneVm();
        result.init(json);
        return result;
    }
}

export interface IZoneVm {
    label: string | undefined;
    color: string | undefined;
    points: any[] | undefined;
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}