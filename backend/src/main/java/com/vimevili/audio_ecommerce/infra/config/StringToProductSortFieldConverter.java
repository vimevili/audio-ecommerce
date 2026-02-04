package com.vimevili.audio_ecommerce.infra.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.vimevili.audio_ecommerce.enums.ProductSortField;

@Component
public class StringToProductSortFieldConverter implements Converter<String, ProductSortField> {

    @Override
    public ProductSortField convert(String source) {
        if (source == null || source.isBlank()) {
            return null;
        }
        return ProductSortField.valueOf(source.toUpperCase());
    }
}
