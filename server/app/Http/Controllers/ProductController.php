<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Requests\Product\ProductUpdateRequest;

class ProductController extends Controller
{
    const PAGINATION_AMOUNT = 4;
    private $product;

    /**
     * ProductController constructor.
     */
    public function __construct(Product $product)
    {
        $this->middleware('auth:api', ['except'=>['index', 'show']]);
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json($this->product->with('prices')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductStoreRequest $request)
    {
        $this->authorize('create', $this->product);
        $data = $request->validated();
        $path = $request->image->store('images/product', 'public');
        $data['img_path'] = $path;
        $data['img_url'] = config('app.url').Storage::url($path);
        $product = $this->product->create($data);

        $product->prices()->create(['price' => $data['price']]);

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = $this->product->findOrFail($id);
        $withPrices = $product->with('prices')->where('id', $product->id)->get();
        return response()->json($withPrices);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductUpdateRequest $request, $id)
    {
        $product = $this->product->findOrFail($id);
        $this->authorize('update', $product);
        $data = $request->validated();

        if($img = $request->file('image')) {
            Storage::disk('public')->delete($product->img_path);
            $data['img_path'] = $img->store('images/product', 'public');
            $data['img_url'] = Storage::url($data['img_path']);
        }

        $product->update($data);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = $this->product->findOrFail($id);
        $this->authorize('delete', $product);

        $product->delete();

        return response()->json(['response' => __('Pomyślnie usunięto produkt')]);
    }
}
