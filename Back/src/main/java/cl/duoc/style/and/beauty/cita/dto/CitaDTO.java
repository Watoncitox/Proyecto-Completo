package cl.duoc.style.and.beauty.cita.dto;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
@Getter
@Setter
public class CitaDTO {

    private Long id;
    private Long idCliente;
    private Long idTrabajador;
    private Long idServicio;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime fechaHora;

    private Integer duracionMin;
    private String estado;
    private String observacion;
}