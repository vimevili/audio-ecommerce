package com.vimevili.audio_ecommerce.enums;

public enum ProductSortField {
    NAME("p.name"),
    PRICE("p.price"),
    RATING("AVG(r.rate)"),
    REVIEWS("COUNT(r)");

    private final String field;

    ProductSortField(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
