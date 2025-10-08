import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { httpClient } from "./httpClient";

type Identifier = string | number;

export abstract class CrudService<TEntity, TCreate = Partial<TEntity>, TUpdate = Partial<TEntity>> {
    protected readonly resourcePath: string;

    private readonly clientInstance: AxiosInstance;

    protected constructor(resourcePath: string, clientInstance: AxiosInstance = httpClient) {
        this.resourcePath = resourcePath;
        this.clientInstance = clientInstance;
    }

    protected get client(): AxiosInstance {
        return this.clientInstance;
    }

    protected buildUrl(id?: Identifier): string {
        if (id === null || id === undefined) {
            return this.resourcePath;
        }

        const idSegment = encodeURIComponent(String(id));

        if (this.resourcePath.endsWith("/")) {
            return `${this.resourcePath}${idSegment}`;
        }

        return `${this.resourcePath}/${idSegment}`;
    }

    async list(config?: AxiosRequestConfig): Promise<TEntity[]> {
        const response = await this.client.get<TEntity[]>(this.buildUrl(), config);

        return response.data;
    }

    async get(id: Identifier, config?: AxiosRequestConfig): Promise<TEntity> {
        const response = await this.client.get<TEntity>(this.buildUrl(id), config);

        return response.data;
    }

    async create(payload: TCreate, config?: AxiosRequestConfig): Promise<TEntity> {
        const response = await this.client.post<TEntity>(this.buildUrl(), payload, config);

        return response.data;
    }

    async update(id: Identifier, payload: TUpdate, config?: AxiosRequestConfig): Promise<TEntity> {
        const response = await this.client.patch<TEntity>(this.buildUrl(id), payload, config);

        return response.data;
    }

    async replace(id: Identifier, payload: TCreate, config?: AxiosRequestConfig): Promise<TEntity> {
        const response = await this.client.put<TEntity>(this.buildUrl(id), payload, config);

        return response.data;
    }

    async remove(id: Identifier, config?: AxiosRequestConfig): Promise<void> {
        await this.client.delete(this.buildUrl(id), config);
    }
}
