package cl.duoc.style.and.beauty.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {

    private String nombre;
    private String descripcion;
    private Double precio;
    private String categoria;
    private Integer stockMinimo;
}
