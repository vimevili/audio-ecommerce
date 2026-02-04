package com.vimevili.audio_ecommerce.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vimevili.audio_ecommerce.dtos.product.ProductDetailsDTO;
import com.vimevili.audio_ecommerce.dtos.product.ProductInfoDTO;
import com.vimevili.audio_ecommerce.enums.ProductCategory;
import com.vimevili.audio_ecommerce.enums.ProductSortField;
import com.vimevili.audio_ecommerce.exceptions.ResourceNotFoundException;
import com.vimevili.audio_ecommerce.respositories.ProductRepository;
import com.vimevili.audio_ecommerce.respositories.ReviewRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("ProductService Tests")
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ProductService productService;

    private ProductInfoDTO mockProduct;
    private UUID productId;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();
        mockProduct = new ProductInfoDTO(
                productId,
                "Premium Headphone",
                "https://example.com/headphone.jpg",
                "High quality wireless headphone",
                ProductCategory.HEADPHONES,
                299.99,
                4.5,
                120L
        );
    }

    @Nested
    @DisplayName("findById")
    class FindById {

        @Test
        @DisplayName("should return product with reviews when found")
        void shouldReturnProductWhenFound() {
            when(productRepository.findByIdAsDTO(productId)).thenReturn(Optional.of(mockProduct));
            when(reviewRepository.findByProductIdAsDTO(productId)).thenReturn(Collections.emptyList());

            ProductDetailsDTO result = productService.findById(productId);

            assertNotNull(result);
            assertEquals(mockProduct.id(), result.id());
            assertEquals(mockProduct.name(), result.name());
            assertEquals(mockProduct.price(), result.price());
            assertNotNull(result.reviews());
            verify(productRepository, times(1)).findByIdAsDTO(productId);
            verify(reviewRepository, times(1)).findByProductIdAsDTO(productId);
        }

        @Test
        @DisplayName("should throw ResourceNotFoundException when product not found")
        void shouldThrowExceptionWhenNotFound() {
            when(productRepository.findByIdAsDTO(productId)).thenReturn(Optional.empty());

            ResourceNotFoundException exception = assertThrows(
                    ResourceNotFoundException.class,
                    () -> productService.findById(productId)
            );

            assertEquals("No product was found with this ID!", exception.getMessage());
            verify(productRepository, times(1)).findByIdAsDTO(productId);
        }
    }

    @Nested
    @DisplayName("findProducts")
    class FindProducts {

        private ProductInfoDTO headphone;
        private ProductInfoDTO headset;

        @BeforeEach
        void setUp() {
            headphone = new ProductInfoDTO(
                    UUID.randomUUID(),
                    "Premium Headphone",
                    "headphone.jpg",
                    "Description",
                    ProductCategory.HEADPHONES,
                    299.99,
                    4.5,
                    100L
            );
            headset = new ProductInfoDTO(
                    UUID.randomUUID(),
                    "Gaming Headset",
                    "headset.jpg",
                    "Description",
                    ProductCategory.HEADSETS,
                    199.99,
                    4.2,
                    85L
            );
        }

        @Test
        @DisplayName("should return all products when no filters applied")
        void shouldReturnAllProductsWithNoFilters() {
            when(productRepository.findProducts(null, null, null, null))
                    .thenReturn(List.of(headphone, headset));

            Set<ProductInfoDTO> result = productService.findProducts(null, null, null, null);

            assertEquals(2, result.size());
            verify(productRepository).findProducts(null, null, null, null);
        }

        @Test
        @DisplayName("should filter by category")
        void shouldFilterByCategory() {
            when(productRepository.findProducts(ProductCategory.HEADPHONES, null, null, null))
                    .thenReturn(List.of(headphone));

            Set<ProductInfoDTO> result = productService.findProducts(ProductCategory.HEADPHONES, null, null, null);

            assertEquals(1, result.size());
            assertTrue(result.stream().allMatch(p -> p.category() == ProductCategory.HEADPHONES));
        }

        @Test
        @DisplayName("should filter by search term")
        void shouldFilterBySearchTerm() {
            when(productRepository.findProducts(null, "Gaming", null, null))
                    .thenReturn(List.of(headset));

            Set<ProductInfoDTO> result = productService.findProducts(null, "Gaming", null, null);

            assertEquals(1, result.size());
            verify(productRepository).findProducts(null, "Gaming", null, null);
        }

        @Test
        @DisplayName("should apply sorting parameters")
        void shouldApplySortingParams() {
            when(productRepository.findProducts(null, null, ProductSortField.PRICE, "asc"))
                    .thenReturn(List.of(headset, headphone));

            Set<ProductInfoDTO> result = productService.findProducts(null, null, ProductSortField.PRICE, "asc");

            assertEquals(2, result.size());
            verify(productRepository).findProducts(null, null, ProductSortField.PRICE, "asc");
        }

        @Test
        @DisplayName("should apply all filters combined")
        void shouldApplyAllFiltersCombined() {
            when(productRepository.findProducts(
                    ProductCategory.HEADPHONES,
                    "Premium",
                    ProductSortField.RATING,
                    "desc"
            )).thenReturn(List.of(headphone));

            Set<ProductInfoDTO> result = productService.findProducts(
                    ProductCategory.HEADPHONES,
                    "Premium",
                    ProductSortField.RATING,
                    "desc"
            );

            assertEquals(1, result.size());
            verify(productRepository).findProducts(
                    ProductCategory.HEADPHONES,
                    "Premium",
                    ProductSortField.RATING,
                    "desc"
            );
        }

        @Test
        @DisplayName("should return empty set when no products match")
        void shouldReturnEmptySetWhenNoMatch() {
            when(productRepository.findProducts(null, "NonExistent", null, null))
                    .thenReturn(List.of());

            Set<ProductInfoDTO> result = productService.findProducts(null, "NonExistent", null, null);

            assertTrue(result.isEmpty());
        }

        @Test
        @DisplayName("should preserve order from repository (LinkedHashSet)")
        void shouldPreserveOrderFromRepository() {
            when(productRepository.findProducts(null, null, ProductSortField.NAME, "asc"))
                    .thenReturn(List.of(headset, headphone));

            Set<ProductInfoDTO> result = productService.findProducts(null, null, ProductSortField.NAME, "asc");

            List<ProductInfoDTO> resultList = result.stream().toList();
            assertEquals("Gaming Headset", resultList.get(0).name());
            assertEquals("Premium Headphone", resultList.get(1).name());
        }
    }
}
