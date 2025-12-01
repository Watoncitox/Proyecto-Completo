package cl.duoc.style.and.beauty.cita.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

@Entity
@Table(name = "CITA")
@Getter
@Setter
public class Cita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CITA")
    private Long id;

    @Column(name = "ID_CLIENTE", nullable = false)
    private Long idCliente;

    @Column(name = "ID_TRABAJADOR", nullable = false)
    private Long idTrabajador;

    @Column(name = "ID_SERVICIO", nullable = false)
    private Long idServicio;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "FECHA_HORA", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "DURACION_MIN", nullable = false)
    private Integer duracionMin;

    @Column(name = "ESTADO", nullable = false)
    private String estado;

    @Column(name = "OBSERVACION")
    private String observacion;
}
