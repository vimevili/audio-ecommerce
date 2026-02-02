package com.vimevili.audio_ecommerce.enums;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("ProductSortField Enum Tests")
class ProductSortFieldTest {

    @Test
    @DisplayName("NAME should return 'p.name' JPQL expression")
    void nameShouldReturnCorrectField() {
        assertEquals("p.name", ProductSortField.NAME.getField());
    }

    @Test
    @DisplayName("PRICE should return 'p.price' JPQL expression")
    void priceShouldReturnCorrectField() {
        assertEquals("p.price", ProductSortField.PRICE.getField());
    }

    @Test
    @DisplayName("RATING should return 'AVG(r.rate)' JPQL expression")
    void ratingShouldReturnAggregateFunction() {
        assertEquals("AVG(r.rate)", ProductSortField.RATING.getField());
    }

    @Test
    @DisplayName("REVIEWS should return 'COUNT(r)' JPQL expression")
    void reviewsShouldReturnCountFunction() {
        assertEquals("COUNT(r)", ProductSortField.REVIEWS.getField());
    }

    @Test
    @DisplayName("Enum should have exactly 4 values")
    void shouldHaveFourValues() {
        assertEquals(4, ProductSortField.values().length);
    }

    @Test
    @DisplayName("valueOf should return correct enum for valid string")
    void valueOfShouldReturnCorrectEnum() {
        assertEquals(ProductSortField.NAME, ProductSortField.valueOf("NAME"));
        assertEquals(ProductSortField.PRICE, ProductSortField.valueOf("PRICE"));
        assertEquals(ProductSortField.RATING, ProductSortField.valueOf("RATING"));
        assertEquals(ProductSortField.REVIEWS, ProductSortField.valueOf("REVIEWS"));
    }

    @Test
    @DisplayName("valueOf should throw exception for invalid string")
    void valueOfShouldThrowForInvalidString() {
        assertThrows(IllegalArgumentException.class, () -> ProductSortField.valueOf("INVALID"));
    }
}
