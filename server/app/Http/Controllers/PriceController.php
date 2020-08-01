<?php

namespace App\Http\Controllers;

use App\Http\Requests\Price\PriceStoreRequest;
use App\Http\Requests\Price\PriceUpdateRequest;
use App\Models\Price;
use App\Models\Product;

class PriceController extends Controller
{
    private $price;
    private $product;

    public function __construct(Price $price, Product $product)
    {
        $this->middleware(['auth:api']);
        $this->price = $price;
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', $this->price);
        return $this->price->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PriceStoreRequest $request)
    {
        $this->authorize('create', $this->price);
        $data = $request->validated();
        $product = $this->product->findOrFail($data['product_id']);

        $product->prices()->create(['price' => $data['price']]);

        return response()->json($product->prices->last());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id - Product id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->authorize('view', $this->price);
        $product = $this->product->findOrFail($id);
        return response()->json($product->prices);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id - Price id
     * @return \Illuminate\Http\Response
     */
    public function update(PriceUpdateRequest $request, $id)
    {
        $price = $this->price->findOrFail($id);
        $this->authorize('update', $price);

        $price->update($request->validated());

        return response()->json(['response' => __('Pomyślnie zaktualizowano cenę')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $price = $this->price->findOrFail($id);
        $this->authorize('delete', $price);

        $price->delete();

        return response()->json(['response' => __('Pomyślnie usunięto cenę produktu')]);
    }
}
