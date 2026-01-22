<?php

namespace App\Filament\Resources;

use Filament\Forms\Components\FileUpload; // Buat Upload Gambar
use Filament\Forms\Components\RichEditor; // Buat Teks Editor Mewah
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn; // <--- Taruh di paling atas file
use Filament\Tables\Columns\ImageColumn;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;



class ProductResource extends Resource
{
    protected static ?string $navigationGroup = 'Shop Management';

    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
            // Kita bungkus pake Section biar ada kotaknya
            Section::make('Informasi Produk')
                ->description('Isi detail barang dagangan lu di sini.')
                ->schema([
                    
                    TextInput::make('name')
                        ->label('Nama Produk')
                        ->required()
                        ->maxLength(255),

                    TextInput::make('price')
                        ->label('Harga')
                        ->numeric()
                        ->prefix('Rp') // Ada tulisan Rp di depannya
                        ->required(),

                    TextInput::make('stock')
                        ->label('Stok')
                        ->numeric()
                        ->default(10)
                        ->required(),

                    // INI DIA BINTANGNYA ⭐
                    RichEditor::make('description')
                        ->label('Deskripsi')
                        ->toolbarButtons([
                            'bold', 'italic', 'bulletList', 'orderedList', 'link', 'h2', 'h3'
                        ])
                        ->columnSpanFull(), // Biar lebar full ke samping
                ])->columns(2), // Bagi jadi 2 kolom

            Section::make('Gambar Produk')
                ->schema([
                    // FITUR UPLOAD GAMBAR 📸
                    FileUpload::make('image_url') 
                        ->label('Foto Produk')
                        ->image() // Validasi harus gambar
                        ->directory('products') // Disimpen di folder storage/app/public/products
                        ->visibility('public') // Biar bisa diakses publik
                        ->required(),
                ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('price')->money('IDR')->sortable(),
                TextColumn::make('stock')->sortable(),
                ImageColumn::make('image_url')->label('Gambar')->square(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
