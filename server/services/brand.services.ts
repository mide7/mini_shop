import { DocumentDefinition } from "mongoose";
import BrandModel, { Brand } from "../models/brands.model"

export async function createBrand(input: DocumentDefinition<Brand>) {
    try {
        return await BrandModel.create(input)
    } catch (error) {
        throw new Error(error)
    }

}

export async function findAllBrands() {
    try {
        return await BrandModel.find().select("name description").exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function findBrandByName(name: string) {
    try {
        return await BrandModel.findOne({ name: name }).exec()
    } catch (error) {
        throw new Error(error)
    }
}
export async function findBrandByID(id: string) {
    try {
        return await BrandModel.findById(id).exec()
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateBrand(id: string, body: Brand) {
    try {
        return await BrandModel.findOneAndUpdate({ _id: id }, { name: body.name, description: body.description })
    } catch (error) {
        throw new Error(error)
    }
}

export async function removeBrand(id: string) {
    try {
        return await BrandModel.findOneAndDelete({ _id: id })
    } catch (error) {
        throw new Error(error)
    }
}
// export async function deleteBrand(id: string) {
//     try {

//     } catch (error) {

//     }
// }

// export async function deleteManyBrands(brands: string[]){
//     try {

//     } catch (error) {

//     }
// }